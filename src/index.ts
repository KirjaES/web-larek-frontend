import './scss/styles.scss';
import { View } from './view/view';
import { Model } from './models';
import { Presenter } from './presenter/presenter';
import { ApiWebLarek } from './api/api';
import { API_URL } from './utils/constants';

const mainContainer = document.body.querySelector('main');
const headerContainer = document.body.querySelector('header');
const view = new View(mainContainer, headerContainer);

const apiClient = new ApiWebLarek(API_URL);
const model = new Model(apiClient);

const presenter = new Presenter(view, model);

presenter.init();
