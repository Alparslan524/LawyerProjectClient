export class CreateAdvert {
    // Buraya api'nin göndereceği çekilde  fieldlar gelicek. Burdaki fieldlari le karşılayacaz
    IdUserFK: number;
    CaseType: CaseType;
    CaseDate: Date;
    Price: number;
    City: string;
    Address: string;
    District: string;
    CasePlace: string;
}

export enum CaseType {
    None = 0,
    BosanmaDavasi = 1,
    TazminatDavasi = 2,
    KiraDavasi = 3
}

/*
public int IdUserFK { get; set; }
public CaseType CaseType { get; set; }
public DateTime CaseDate { get; set; }
public decimal Price { get; set; }
public string City { get; set; }
public string Address { get; set; }
public string District { get; set; }
public string CasePlace { get; set; }
*/