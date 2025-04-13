// Function to determine the type of element
function getElementType(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === 'select') return 'drop-down';
  if (tagName === 'img') return 'image';
  if (tagName === 'a') return 'link';
  if (tagName === 'button') return 'button';
  if (tagName === 'input') return 'input';
  if (tagName === 'textarea') return 'textarea';
  if (element.textContent.trim() !== '') return 'text';
  return 'other';
}

// Log click events to the console
document.addEventListener('click', function(event) {
  const element = event.target;
  const elementType = getElementType(element);
  const timestamp = Date.now();
  console.log(`${timestamp} , click , ${elementType}`);
});
