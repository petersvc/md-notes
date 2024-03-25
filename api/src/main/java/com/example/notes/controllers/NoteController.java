package com.example.notes.controllers;

import com.example.notes.dtos.NoteRecordDto;
import com.example.notes.models.Note;
import com.example.notes.repositories.NoteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteRepository noteRepository;

    @Autowired
    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @PostMapping
    public ResponseEntity<Note> save(@RequestBody @Valid NoteRecordDto noteRecordDto) {
        var note = new Note();
        BeanUtils.copyProperties(noteRecordDto, note);
        return ResponseEntity.status(HttpStatus.CREATED).body(noteRepository.save(note));
    }

    @GetMapping
    public ResponseEntity<List<Note>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(noteRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable UUID id) {
        Optional<Note> note = noteRepository.findById(id);
        if (note.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(note.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateById(@PathVariable UUID id, @RequestBody @Valid NoteRecordDto noteRecordDto) {
        Optional<Note> note = noteRepository.findById(id);
        if (note.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found.");
        }
        var updatedNote = note.get();
        BeanUtils.copyProperties(noteRecordDto, updatedNote);
        return ResponseEntity.status(HttpStatus.OK).body(noteRepository.save(updatedNote));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable UUID id) {
        Optional<Note> note = noteRepository.findById(id);
        if (note.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found.");
        }
        noteRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Note deleted successfully.");
    }
}
