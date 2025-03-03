export type SliceState = {
  token: string;
  user:
    | undefined
    | ({
        agama: string;
        no_ktp: string;
        nama_ibu: string;
        nama_ayah: string;
        namadepan: string;
        nama_suami: string;
        nama_pasien: string;
        jeniskelamin: string;
        tempat_lahir: string;
        warga_negara: string;
        alamat_pasien: string;
        tanggal_lahir: string;
        no_rekam_medik: string;
        no_mobile_pasien: string;
        statusperkawinan: string;
        no_telepon_pasien: string;
        alamat_domisili_pasien: string;
        pasien_id_encrypted: {
          pid: string;
          piv: string;
          ps: string;
        };
      } & Partial<{
        suku: {
          suku_id: number;
          suku_nama: string;
        };
        bahasa: {
          bahasa_id: number;
          bahasa_nama: string;
        };
        kelurahan: {
          kelurahan_id: number;
          kelurahan_nama: string;
        };
        kecamatan: {
          kecamatan_id: number;
          kecamatan_nama: string;
        };
        kabupaten: {
          kabupaten_id: number;
          kabupaten_nama: string;
        };
        provinsi: {
          propinsi_id: number;
          propinsi_nama: string;
        };
        pekerjaan: {
          pekerjaan_id: number;
          pekerjaan_nama: string;
        };
        pendidikan: {
          pendidikan_id: number;
          pendidikan_nama: string;
        };
      }>);
};
