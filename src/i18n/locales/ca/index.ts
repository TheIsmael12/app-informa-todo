import navigation from "./navigation.json";
import views from "./views.json";
import metadata from "./metadata.json";
import buttons from "./buttons.json";
import labels from "./labels.json";
import placeholders from "./placeholders.json";
import modals from "./modals.json";
import validations from "./validations.json";
import tables from "./table.json";

const messages = {
  ...navigation,
  ...views,
  ...metadata,
  ...buttons,
  ...labels,
  ...placeholders,
  ...modals,
  ...validations,
  ...tables
};

export default messages;
