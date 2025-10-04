package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Patient;

public interface PatientService {
    Patient addPatient(Patient patient);
    List<Patient> getAllPatients();
    Patient getPatientById(int id);
    Patient updatePatient(Patient patient);
    void deletePatientById(int id);
}
