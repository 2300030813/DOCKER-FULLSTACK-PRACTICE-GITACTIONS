package com.klef.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "patient_table")
public class Patient {

    @Id
    @Column(name = "patient_id")
    private int id; // Manual entry

    @Column(name = "patient_name", nullable = false, length = 50)
    private String name;

    @Column(name = "patient_age", nullable = false)
    private int age;

    @Column(name = "patient_gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "patient_disease", nullable = false, length = 100)
    private String disease;

    @Column(name = "patient_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "patient_contact", nullable = false, unique = true, length = 20)
    private String contact;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDisease() { return disease; }
    public void setDisease(String disease) { this.disease = disease; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    @Override
    public String toString() {
        return "Patient [id=" + id + ", name=" + name + ", age=" + age +
                ", gender=" + gender + ", disease=" + disease +
                ", email=" + email + ", contact=" + contact + "]";
    }
}
