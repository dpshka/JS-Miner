import type { VueI18n } from "vue-i18n";

import { useAlert } from "@/composables/useAlert";
import { useReports } from "@/composables/useReports";
import type { Report } from "@/types/helpers";
import i18n from "@/utils/i18n";

const { postExportReports } = useReports();
const { setAlert } = useAlert();
const { t } = (i18n.global as unknown as VueI18n) || i18n;

export function useHelpers() {
  function exportFileDirectly(
    data: any,
    fileType = "csv",
    fileName = "reports"
  ) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/" +
        fileType +
        ";charset=UTF-16LE,%EF%BB%BF" +
        encodeURIComponent(data)
    );
    element.setAttribute("download", fileName);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }

  function exportFile(data: Report) {
    const fileType = data?.fileType ? data.fileType : "csv";
    const isXlsx = fileType === "xlsx";
    const element = document.createElement("a");
    const { exportData } = data;

    exportData.fileType = fileType;

    postExportReports(exportData, data.pageType, async (response: any) => {
      if (response?.body?.meta?.errorMessage) {
        setAlert({
          message: t(response.body.meta.errorMessage),
          type: "error",
        });

        return;
      }

      const url = isXlsx
        ? response.result.fileContent
        : `data:text/csv;charset=UTF-16LE,%EF%BB%BF${encodeURIComponent(
            response
          )}`;

      const fileName = isXlsx ? response.result.fileName : "reports.csv";

      try {
        element.href = url;
        element.download = fileName;
        element.style.display = "none";

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        setAlert({
          message: t("export_download.success"),
          type: "success",
        });
      } catch (error) {
        setAlert({
          message: t("export_download.error"),
          type: "error",
        });
      }
    });
  }

  function deepValue<T>(obj: T, path: string): T | undefined {
    if (typeof path !== "string") {
      throw new TypeError("path must be a string");
    }

    const pathArray = path.split(".");
    let current: any = obj;

    for (let i = 0; i < pathArray.length; i++) {
      if (current === undefined || current[pathArray[i]] === undefined) {
        return undefined;
      }
      current = current[pathArray[i]];
    }

    return current;
  }

  function getBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          resolve(result.split(",")[1]);
        } else {
          reject(new Error("Unexpected result type"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }

  function isEmpty(obj: any) {
    return (
      obj == null || (typeof obj === "object" && Object.keys(obj).length === 0)
    );
  }

  function isEqual(value: any, other: any) {
    if (value === other) {
      return true;
    }

    if (
      typeof value !== "object" ||
      value === null ||
      typeof other !== "object" ||
      other === null
    ) {
      return false;
    }

    if (Array.isArray(value) !== Array.isArray(other)) {
      return false;
    }

    const keysA = Object.keys(value);
    const keysB = Object.keys(other);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (
        !Object.prototype.hasOwnProperty.call(other, key) ||
        !isEqual(value[key], other[key])
      ) {
        return false;
      }
    }

    return true;
  }

  return {
    exportFile,
    exportFileDirectly,
    isEmpty,
    isEqual,
    deepValue,
    getBase64,
  };
}
