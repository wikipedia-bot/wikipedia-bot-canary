export default interface returnobject {
  error: boolean;
  errormsg?: string;
  wiki?: {
    refs?: string[];
    title: string;
    image: string;
    text?: string;
    url: string;
    info?: unknown;
    page?: unknown;
  };
  data?: unknown;
}
