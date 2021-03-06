package com.haw.mvsspring.Exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { MyDatabaseException.class })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        final String bodyOfResponse = "Database exeption: " + ex.getMessage();
        return handleExceptionInternal(ex, new ErrorResponseBody(bodyOfResponse), new HttpHeaders(),
                HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    @ExceptionHandler(value = { FileUploadException.class })
    protected ResponseEntity<Object> handleFileUploadException(RuntimeException ex, WebRequest request) {
        final String bodyOfResponse = "File upload exeption: " + ex.getMessage();
        return handleExceptionInternal(ex, new ErrorResponseBody(bodyOfResponse), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    @ExceptionHandler(value = { WrongDataException.class })
    protected ResponseEntity<Object> handleWrongDataException(RuntimeException ex, WebRequest request) {
        final String bodyOfResponse = "Invalid data: " + ex.getMessage();
        return handleExceptionInternal(ex, new ErrorResponseBody(bodyOfResponse), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = { NoContentException.class })
    protected ResponseEntity<Object> handleNoContentException(RuntimeException ex, WebRequest request) {
        return handleExceptionInternal(ex, null, new HttpHeaders(), HttpStatus.NO_CONTENT, request);
    }
}
