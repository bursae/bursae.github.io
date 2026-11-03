const preview = document.querySelector('.project-preview');
const previewImage = preview.querySelector('img');
const previewCaption = preview.querySelector('p');

document.querySelectorAll('.project-card > img').forEach((image) => {
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'project-image-trigger';
  trigger.setAttribute('aria-label', `Enlarge screenshot: ${image.alt}`);
  image.before(trigger);
  trigger.append(image);
  trigger.addEventListener('click', () => {
    previewImage.src = image.dataset.previewSrc || image.src;
    previewImage.alt = image.alt;
    previewCaption.textContent = image.alt;
    preview.showModal();
  });
});

preview.addEventListener('click', (event) => {
  if (event.target === preview) preview.close();
});

const projectFilters = document.getElementById('project-filters');
const projectGroups = [...document.querySelectorAll('.projects-main .project-list')].map(section => {
  const heading = document.getElementById(section.getAttribute('aria-labelledby'));
  return { section, heading, label: heading.textContent, count: section.querySelectorAll('.project-card').length };
});
const filterOptions = [
  { label: 'All', count: projectGroups.reduce((total, group) => total + group.count, 0) },
  ...projectGroups,
];

filterOptions.forEach(option => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `${option.label} (${option.count})`;
  button.setAttribute('aria-pressed', String(option.label === 'All'));
  button.addEventListener('click', () => {
    projectFilters.querySelectorAll('button').forEach(filter => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    projectGroups.forEach(group => {
      const hidden = option.label !== 'All' && option.label !== group.label;
      group.heading.hidden = hidden;
      group.section.hidden = hidden;
    });
  });
  projectFilters.appendChild(button);
});
projectFilters.hidden = false;
