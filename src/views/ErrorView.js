//aui van la vista del error
import { navigateTo } from "../router.js";

export function ErrorView() {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `
    <h2> Error page not found </h2>
    <button type="button" class="returnHome">Home</button>
    `;

  //evento de escucha del clic
  const ErrorLinkEl = viewEl.querySelector('.returnHome');
  ErrorLinkEl.addEventListener('click', () => navigateTo("/" ));

  return viewEl;
}