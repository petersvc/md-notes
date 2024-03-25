package com.example.notes.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NoteRecordDto(@NotBlank String title, @NotBlank String subtitle, @NotBlank String content, @NotNull String date, @NotBlank String folder) {
}
