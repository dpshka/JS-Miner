import { nextTick, onMounted, Ref, ref, watch } from "vue";
import type { VueI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { useAlert } from "@/composables/useAlert";
import { useLocale } from "@/composables/useLocale";
import type {
  PageInitMessagesType,
  PageInitPageDataType,
} from "@/types/page-init";
import i18n from "@/utils/i18n";

const { t, te } = (i18n.global as unknown as VueI18n) || i18n;

export function usePageInit(
  initFn: () => Promise<PageInitPageDataType>,
  onLoaded?: (data: object) => void
) {
  const { setAlert, removeAlert } = useAlert();
  const { locale } = useLocale();
  const route = useRoute();

  const title: Ref<string> = ref("");
  const description: Ref<string> = ref("");
  const pageData: Ref<PageInitPageDataType> = ref({} as PageInitPageDataType);

  async function initPage() {
    removeAlert();

    pageData.value = await initFn();
    pageData.value?.messages.forEach((message: PageInitMessagesType) => {
      const button = message.button;
      if (button) button.text = te(button.text) ? t(button.text) : button.text;
      setAlert({
        title: message.title
          ? te(message.title)
            ? t(message.title)
            : message.title
          : "",
        message: te(message.description)
          ? t(message.description)
          : message.description,
        type: message.type,
        button: button,
        page: route.name,
      });
    });
    title.value = pageData.value?.content?.header?.title;
    description.value = pageData.value?.content?.header?.description;
    onLoaded?.(pageData.value);
  }

  onMounted(initPage);
  watch(
    () => locale.value,
    () => nextTick(initPage)
  );

  return {
    pageData,
    title,
    description,
  };
}
