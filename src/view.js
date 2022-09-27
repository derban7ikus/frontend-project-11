const render = (state, input, form, feedback) => {
  // eslint-disable-next-line no-empty
  if (state.isInvalid) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = state.errors;
  }
  if (!state.isInvalid) {
    input.classList.remove('is-invalid');
    feedback.classList.remove('text-danger');
    feedback.textContent = state.errors;
    // form.reset();
    // input.focus();
  }
};

export default render;
