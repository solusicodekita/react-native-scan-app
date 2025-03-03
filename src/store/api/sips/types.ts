export type PacsSeriesResponseItem = {
  dicomMetadata: Record<string, any>;
  objects: Array<{
    dicomMetadata:
      | {
          instanceNumber: number;
          sopInstanceUid: string;
        }
      | any;
  }>;
};
// | any;

export type PacsSeriesResponse = {
  study: {
    dicomMetadata: Array<any>;
    series: Array<PacsSeriesResponseItem>;
  };
};

export type SipsResponse<Respons = any> = {
  metadata: {code: number; message: string};
  response?: Respons;
} & {
  path?: string;
  cacheKey?: string;
};

export type Pnj = {
  pnjid: string;
  pnjiv: string;
  pnjs: string;
};

export type ItemRiwayat = {
  tglmasukpenunjang: string;
  nama_pegawai: string;
  pasienmasukpenunjang_id_encrypted: {
    pnjid: string;
    pnjv: string;
    pnjs: string;
  };
};

// --
// --
// --
// --
// --

export type DetailRiwayatResponse = {
  lis_reg_no: string | null;
  pasienkirimkeunitlain_id: number;
  tgl_kirimpasien: string;
  instalasi_asal: string;
  ruangan_asal: string;
  pegawai_id: number;
  nama_pegawai: string;
  diagnosa_id: number;
  diagnosa_kode: string;
  diagnosa_nama: string;
  keterangandiagnosa_klinis: string;
  catatandokterpengirim: string;
  is_nosokomial: string | null;
  lis_test_id: string | null;
  pendaftaran_id: number;
  instalasi_id: number;
  hasilpemeriksaanpa_id: string | null;
  tindakanpelayanan_id: number;
  tglmasukpenunjang: string;
  pasien_id: number;
  daftartindakan_id: number;
  daftartindakan_nama: string;
  samplelab_nama: string | null;
  his_test_id_order: string | null;
  test_name: string | null;
  result: string | null;
  reference_value: string | null;
  test_flag_sign: string | null;
  test_group: string | null;
  test_units_name: string | null;
  result_note: string | null;
  result_comment: string | null;
  authorization_date: string | null;
  dpjtm_name: string | null;
  ppds_name: string | null;
  hasilexpertise: string;
  kesimpulan_hasilrad: string;
  kritis_rad: false;
  tgl_verifrad: string;
  ruangan_nama: string;
  dpjp_rad: string;
  dokterpemeriksa1: string | null;
  dpjtm_name_final: string;
  kurang_satu_bulan: false;
  pasienmasukpenunjang_id_encrypted: {
    pnjid: string;
    pnjv: string;
    pnjs: string;
  };
  ris_out_pacs?: {
    no_rm: number;
    no_register: string;
    no_rontgen: string;
    id_detail_radiologi: string;
    kode_user_admin: string;
    nama__user_admin: string;
    admin_datetime_start: string;
    admin_datetime_end: string;
    kode_user_radiografer: string;
    nama_radiografer: string;
    radiografer_datetime_start: string;
    radiografer_datetime_end: string;
    kode_dokter_radiolog: string;
    nama_radiolog: string;
    radiolog_datetime_start: string | null;
    radiolog_datetime_end: string | null;
    kritis: string;
    expertise_text_finding: string;
    expertise_text_conclusion: string;
    expertise_html_finding: string;
    expertise_html_conclusion: string;
    urllink1: string;
    urllink2: string;
    urllink3: string;
    urllink4: string;
    urllink5: string;
    updateSIMRS: string | null;
    id_ris_in: number;
    url_mobile1: string;
    url_mobile2: string;
    url_mobile3: string | null;
  };
  pendaftaran: {
    pendaftaran_id: number;
    tgl_pendaftaran: string;
  };
};

export type SipsJsonResponse<R = any> = {
  metadata: {code: number; message: string};
  response: R;
};

type SeriesDicomMetadata = {
  modality: string;
  SeriesNumber: number;
  SeriesDescription: string;
  SeriesInstanceUID: string;
};

type ObjectDicomMetadata = {
  sopInstanceUid: string;
  columns: number;
  rows: number;
  bitsAllocated: number;
  bigEndian: boolean;
  instanceNumber: number;
  slope: number;
  intercept: number;
  windowCenter: string;
  windowWidth: string;
  patientImageOrientation: any[];
  patientImagePosition: any[];
  pixelSpacing: any[];
  photometricInterpretation: string;
  frameOfRefUid: string;
};

type PacsObject = {
  dicomMetadata: ObjectDicomMetadata;
  fileMeta: {
    id: string;
  };
};

type Series = {
  dicomMetadata: SeriesDicomMetadata;
  objects: PacsObject[];
};

export type SipsPacsResponse = {
  study: {
    series: Series[];
  };
};

export type SipsPacsNormalizedResponse = {
  modality: SipsPacsResponse['study']['series'][any]['dicomMetadata']['modality'];
  number: SipsPacsResponse['study']['series'][any]['dicomMetadata']['SeriesNumber'];
  desc: SipsPacsResponse['study']['series'][any]['dicomMetadata']['SeriesDescription'];
  uid: SipsPacsResponse['study']['series'][any]['dicomMetadata']['SeriesInstanceUID'];
  objects: {
    number: SipsPacsResponse['study']['series'][any]['objects'][any]['dicomMetadata']['instanceNumber'];
    uid: SipsPacsResponse['study']['series'][any]['objects'][any]['dicomMetadata']['sopInstanceUid'];
    uri: string;
  }[];
}[];

/**
 * Format dari BQ adalah {data: unknown}|{error:...}
 * Struktur data yang disimpan pada global state.
 * 3 kemungkinan response:
 * - metadata
 * - pacs
 * - blob (image)
 */
export type ApiSipsCachedResponse<R = unknown> = {
  /**
   * Kunci untuk mendapatkan lokasi cache disimpan.
   */
  cacheKey: string;
  /**
   * Lokasi file cache yang disimpan di penyimpanan lokal.
   */
  cachePath: string;
  /**
   * Bagian metadata dari respons yang dikembalikan oleh server.
   */
  metadata: {
    code: number;
    message?: string;
  };
  /**
   * Bagian response dari respons yang dikembalikan oleh server.
   */
  response?: R;
};
