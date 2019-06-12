import './sass/main.scss';
import { refs, handleSubmit, handleClick, handleSearchInput } from './js/app';

refs.noteEditorForm.addEventListener('submit', handleSubmit);
refs.noteList.addEventListener('click', handleClick);
refs.searchForm.addEventListener('input', handleSearchInput);