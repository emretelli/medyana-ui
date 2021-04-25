import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { PatientFilter } from '../interfaces/patientFilter';

@Pipe({
  name: 'patientFilter'
})
export class PatientFilterPipe implements PipeTransform {

  transform(items: Patient[], searchText: PatientFilter): Patient[] {
    if (!items) return [];
    items = searchText.polyclinicCode ? items.filter(t => t.polyclinicCode.toLowerCase().includes(searchText.polyclinicCode.toLowerCase())) : items;
    items = searchText.doctorNameSurname ? items.filter(t => t.doctorName.toLowerCase().includes(searchText.doctorNameSurname.toLowerCase()) 
                                                        || t.doctorSurname.toLowerCase().includes(searchText.doctorNameSurname.toLowerCase())) : items;
    items = searchText.patientNameSurname ? items.filter(t => t.name.toLowerCase().includes(searchText.patientNameSurname.toLowerCase()) 
                                                         || t.surname.toLowerCase().includes(searchText.patientNameSurname.toLowerCase())) : items;
    return items;
  }

}
