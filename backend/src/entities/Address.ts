export class Address {
  constructor(
    public readonly user_id: string,
    public street: string,
    public number: string,
    public neighborhood: string,
    public city: string,
    public state: string,
    public zip_code: string,
    private is_default: boolean,
    public complement?: string | null,
    public readonly id?: string
  ) {}

  public isDefaultAddress(): boolean {
    return this.is_default;
  }

  public setIsDefault(isDefault: boolean): void {
    this.is_default = isDefault;
  }
}