type TClientCustomEventListener = (
  event: CustomEvent<string>
) => Promise<void> | void;

export default TClientCustomEventListener;
