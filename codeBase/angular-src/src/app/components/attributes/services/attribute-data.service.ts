import {Applications,updateAttribute,deleteAttribute,addAttribute,allAttributes,attributes_fetchByAppId,attributeById,filterAttributes} from '../../../routeConfig';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AttributeDataService {

  constructor(private http: Http) { }

//#region GET REQUESTS

  getAllApplications() {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get(Applications, {headers: headers})
    .map(res => res.json());
  }

  getAllAttributes() {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get(allAttributes, {headers: headers})
    .map(res => res.json());
  }

  getAttributeById(_id) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get(attributeById + _id, {headers: headers})
    .map(res => res.json());
  }

  filterByName(Name) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get('http://localhost:3000/api/attributes/filterAttributes?Name=' + Name, {headers: headers})
    .map(res => res.json());
  }

  filterByType(Type) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get('http://localhost:3000/api/attributes/filterAttributes?Type=' + Type, {headers: headers})
    .map(res => res.json());
  }

  filterByDataType(DataType) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get('http://localhost:3000/api/attributes/filterAttributes?DataType=' + DataType, {headers: headers})
    .map(res => res.json());
  }

  filterByNameType(Name, Type) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get('http://localhost:3000/api/attributes/filterAttributes?Name=' + Name + '&Type=' + Type, {headers: headers})
    .map(res => res.json());
  }

  filterByTypeDataType(Type, DataType) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:3000/api/attributes/filterAttributes?Type=' + Type + '&DataType=' + DataType, {headers: headers})
    .map(res => res.json());
  }

  filterByDataTypeName(DataType, Name) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:3000/api/attributes/filterAttributes?DataType=' + DataType + '&Name=' + Name, {headers: headers})
    .map(res => res.json());
  }

  filterByNameTypeDataType(Name, Type, DataType) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:3000/api/attributes/filterAttributes?Name=' + Name + '&Type=' + Type + '&DataType=' + DataType, {headers: headers})
    .map(res => res.json());
  }

//#endregion

//#region POST REQUESTS

  addAttribute(Obj_Attribute) {
      // tslint:disable-next-line:prefer-const
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      return this.http.post(addAttribute, Obj_Attribute, {headers: headers})
      .map(res => res.json());
    }

//#endregion

//#region PUT REQUESTS

    updateAttribute(Obj_Attribute) {
        // tslint:disable-next-line:prefer-const
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this.http.put(updateAttribute, Obj_Attribute, {headers: headers})
        .map(res => res.json());
    }

//#endregion

//#region DELETE REQUESTS

    deleteAttribute(_id) {
      // tslint:disable-next-line:prefer-const
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      return this.http.delete(deleteAttribute+ _id, {headers: headers})
      .map(res => res.json());
    }

//#endregion

}
