package com.markethub.common.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;

public class ResponseBuilder {
    /**
     * Builds a standard HTTP 200 (OK) response for successful API operations.
     * 
     * @param message descriptive message of the performed operation
     * @param data    response payload sent to the client.
     * @param <T>     generic type of the object contained in {@code data}.
     * @return a {@link ResponseEntity} containing an {@link ApiResponse}
     *         with information about the successful operation.
     */
    public static <T> ResponseEntity<ApiResponse<T>> ok(String message, T data) {
        return ResponseEntity.ok(
                ApiResponse.<T>builder()
                        .success(true)
                        .message(message)
                        .data(data)
                        .error(null)
                        .build());
    }

    /**
     * Builds a standard HTTP response for successful API operations.
     * 
     * @param message descriptive message of the performed operation
     * @param data    response payload sent to the client.
     * @param status  HTTP status to be returned in the response
     * @param <T>     generic type of the object contained in {@code data}.
     * @return a {@link ResponseEntity} containing an {@link ApiResponse}
     *         with information about the successful operation.
     */
    public static <T> ResponseEntity<ApiResponse<T>> build(String message, T data, @NonNull HttpStatus status) {
        return ResponseEntity.status(status).body(
                ApiResponse.<T>builder()
                        .success(status.is2xxSuccessful())
                        .message(message)
                        .data(data)
                        .error(null)
                        .build());
    }

    /**
     * Builds a standard HTTP response for failed API operations.
     * 
     * @param message descriptive message explaining the error
     * @param error   error details or metadata to be returned to the client.
     * @param status  HTTP status to be returned in the response
     *                (e.g. {@link HttpStatus#BAD_REQUEST},
     * @return a {@link ResponseEntity} containing an {@link ApiResponse}
     *         with information about the failed operation.
     */
    public static ResponseEntity<ApiResponse<Object>> error(String message, Object error, @NonNull HttpStatus status) {
        return ResponseEntity.status(status).body(
                ApiResponse.builder()
                        .success(status.is2xxSuccessful())
                        .message(message)
                        .data(null)
                        .error(error)
                        .build());
    }
}
