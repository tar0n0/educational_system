import { BehaviorSubject } from 'rxjs';
import {
    COMPANY_CITIES,
    COMPANY_COUNTRIES,
    ENDPOINT_URLS,
    UNIVERSITY_CITIES,
    UNIVERSITY_COUNTRIES,
} from '../constants/api.constants';
import MakeRequest from './axios.service';

class DataService extends MakeRequest {
    constructor() {
        super();
        this._universities = new BehaviorSubject([]);
        this._companies = new BehaviorSubject([]);
        this._universtyCities = new  BehaviorSubject([]);
        this._companyCities = new BehaviorSubject([]);
    }

    getCities(url, name) {
        this.getJson(url).then(val => {
            const { data } = val;
            const currentData = [...data.map(el => ({
                name: el.cityName,
                id: el.cityId,
            }))];
            switch (name) {
                case UNIVERSITY_CITIES:
                    this._universtyCities.next(currentData || []);
                    break;
                case COMPANY_CITIES:
                    this._companyCities.next(currentData || []);
                    break;
                default:
            }
        });
    }

    getCountries(name) {
        this.getJson(ENDPOINT_URLS[name]).then(val => {
            const { data } = val;
            const currentData = [...data.map(el => ({
                name: el.countryName,
                id: el.contryId,
            }))];
            switch (name) {
                case UNIVERSITY_COUNTRIES:
                    this._universities.next(currentData || []);
                    break;
                case COMPANY_COUNTRIES:
                    this._companies.next(currentData || []);
                    break;
                default:
            }
        });
    }

    get universityCountries() {
        return this._universities;
    }

    get companyCountries() {
        return this._companies;
    }

    get universityCities() {
        return this._universtyCities;
    }

    get companiesCities() {
        return this._companyCities;
    }
}

export default new DataService();
