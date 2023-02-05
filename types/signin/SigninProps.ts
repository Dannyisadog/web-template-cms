interface ProviderItem {
  name: string;
  id: string;
}

export default interface SigninProps {
  providers: ProviderItem[];
}