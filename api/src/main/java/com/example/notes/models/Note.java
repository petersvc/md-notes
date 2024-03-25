package com.example.notes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "tb_notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public UUID id;
    public String title;
    public String subtitle;
    public String content;
    public String folder;
    public String date;
}
