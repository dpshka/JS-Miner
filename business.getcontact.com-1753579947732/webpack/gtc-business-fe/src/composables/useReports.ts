import { callWithToken, Service } from "@/api";
import type {
  Callback,
  ReportsExportData,
  ReportsQuery,
} from "@/types/reports";

export function useReports() {
  async function getCallerIdReportsInit() {
    const data = await callWithToken(Service.getCallCardReportsInit);
    return data.result;
  }

  async function getUserVerifyReportsInit() {
    const data = await callWithToken(Service.getUserVerifyReportsInit);
    return data.result;
  }

  async function postCallCardReports(
    params: ReportsQuery,
    callback?: (res: Callback) => void
  ) {
    try {
      const response = await callWithToken(Service.postCallCardReports, {
        body: params,
      });

      if (callback) callback(response.result);
    } catch (error: any) {
      if (callback) callback(error);
    }
  }

  async function postUserVerifyReports(params: ReportsQuery) {
    const data = await callWithToken(Service.postUserVerifyReports, {
      body: params,
    });

    return data.result;
  }

  async function postCallCardReportsFilters() {
    const data = await callWithToken(Service.postCallCardReportsFilters);
    return data.result;
  }

  async function postExportReportsMail(
    params: ReportsExportData,
    type: "user-verify" | "call-card-with-percentage" | "tag-view" | "spam-api",
    callback?: (res: Callback) => void
  ) {
    try {
      if (type === "call-card-with-percentage") {
        const response = await callWithToken(
          Service.postExportCallCardReportsMail,
          {
            body: params,
          }
        );

        if (callback) callback(response.result);
      } else if (type === "user-verify") {
        const response = await callWithToken(
          Service.postExportUserVerifyReportsMail,
          {
            body: params,
          }
        );

        if (callback) callback(response.result);
      } else {
        const response = await callWithToken(Service.postExportReportsMail, {
          body: { ...params, type },
        });

        if (callback) callback(response.result);
      }
    } catch (error: any) {
      if (callback) callback(error);
    }
  }

  async function postExportReports(
    params: ReportsExportData,
    type: "user-verify" | "call-card-with-percentage" | "tag-view",
    callback?: (res: Callback) => void
  ) {
    try {
      if (type === "call-card-with-percentage") {
        const response = await callWithToken(
          Service.postExportCallCardReports,
          {
            body: params,
          }
        );

        if (callback) callback(response);
      } else if (type === "user-verify") {
        const response = await callWithToken(
          Service.postExportUserVerifyReports,
          {
            body: params,
          }
        );

        if (callback) callback(response);
      } else {
        const response = await callWithToken(Service.postExportReports, {
          body: { ...params, type },
        });

        if (callback) callback(response);
      }
    } catch (error: any) {
      if (callback) callback(error);
    }
  }

  return {
    getCallerIdReportsInit,
    getUserVerifyReportsInit,
    postCallCardReports,
    postUserVerifyReports,
    postCallCardReportsFilters,
    postExportReportsMail,
    postExportReports,
  };
}
