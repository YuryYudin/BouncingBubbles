#!/usr/bin/env python3
"""Extract files from raw Atari ST disk images (GEMDOS FAT12)."""
import struct, sys, os

SECTOR = 512

def parse(image_path, out_dir):
    data = open(image_path, 'rb').read()
    # BPB
    bps = struct.unpack('<H', data[0x0B:0x0D])[0]
    spc = data[0x0D]
    res = struct.unpack('<H', data[0x0E:0x10])[0]
    nfats = data[0x10]
    rootents = struct.unpack('<H', data[0x11:0x13])[0]
    spf = struct.unpack('<H', data[0x16:0x18])[0]
    print(f"bps={bps} spc={spc} res={res} nfats={nfats} rootents={rootents} spf={spf}")
    if bps == 0: bps = 512
    if res == 0: res = 1
    if spc == 0: spc = 2
    if nfats == 0: nfats = 2
    if rootents == 0: rootents = 112
    if spf == 0: spf = 5

    fat_start = res * bps
    root_start = fat_start + nfats * spf * bps
    root_size = rootents * 32
    data_start = root_start + root_size
    cluster_size = spc * bps

    os.makedirs(out_dir, exist_ok=True)

    def read_fat():
        fat = data[fat_start:fat_start + spf * bps]
        entries = []
        for i in range(0, len(fat) - 1, 3):
            b0, b1, b2 = fat[i], fat[i+1], fat[i+2]
            entries.append(((b1 & 0x0F) << 8) | b0)
            entries.append((b2 << 4) | (b1 >> 4))
        return entries

    fat = read_fat()

    def read_cluster_chain(start, label=''):
        out = bytearray()
        cl = start
        seen = set()
        while 2 <= cl < 0xFFEF and cl not in seen and cl < len(fat):
            seen.add(cl)
            off = data_start + (cl - 2) * cluster_size
            out += data[off:off + cluster_size]
            cl = fat[cl]
        if cl >= 0xFFEF or cl in seen:
            pass
        return bytes(out)

    def scan_dir(raw, path):
        for i in range(0, len(raw) - 31, 32):
            e = raw[i:i+32]
            name = e[0:8].decode('latin1').strip()
            ext = e[8:11].decode('latin1').strip()
            attr = e[11]
            start = struct.unpack('<H', e[26:28])[0]
            size = struct.unpack('<L', e[28:32])[0]
            if e[0] == 0x00: continue
            if e[0] == 0xE5: continue
            if attr & 0x08: continue  # volume label
            if attr & 0x10:  # dir
                if name in ('.', '..'): continue
                sub = read_cluster_chain(start)
                scan_dir(sub, os.path.join(path, name))
            else:
                content = read_cluster_chain(start)[:size]
                fn = (name + ('.' + ext if ext else '')).replace('/', '_')
                fp = os.path.join(out_dir, path, fn)
                os.makedirs(os.path.dirname(fp), exist_ok=True)
                with open(fp, 'wb') as f:
                    f.write(content)
                print(f"  {os.path.join(path, fn)}  ({size} bytes)")

    print(f"Extracting {image_path} -> {out_dir}")
    scan_dir(data[root_start:root_start + root_size], '')

if __name__ == '__main__':
    parse(sys.argv[1], sys.argv[2])
