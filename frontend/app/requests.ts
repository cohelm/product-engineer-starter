import { cleanExcessSlashesInPath } from "@/utils";
import axios, { AxiosError, AxiosResponse } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;


/**
 * POST /cases
 * create a new case
 * @returns a string repr the case id
 */
export const xhrSubmitDashboard = async () => {
  try{
    const url = cleanExcessSlashesInPath(`${baseUrl}/cases`);
    const {data} = await axios.post(url);
    return data?.id || "";
  } catch(error: AxiosError | unknown){
    if(error instanceof AxiosError){
      const {response} = <AxiosError>error;
      const {status, data} = <AxiosResponse>response;
      throw {status, error: data};
    }
    else throw {status: -1, error};
  }
}

/**
 * GET /cases/<case-id>
 * get a case by case ID
 * @returns case data
 */
export const xhrReadCaseById = async (caseId: string) => {
  const url = cleanExcessSlashesInPath(`${baseUrl}/cases/${caseId.trim()}`);
  try{
    const {data} = await axios.get(url);
    return data;
  } catch(error: AxiosError | unknown){
    if(error instanceof AxiosError){
      const {response} = <AxiosError>error;
      const {status, data} = <AxiosResponse>response;
      throw {status, error: data};
    }
    else throw {status: -1, error};
  }
}