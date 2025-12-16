package com.markethub;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class MainTest {

    @Test
    public void testMainMethodExists() {
        assertDoesNotThrow(() -> Main.main(new String[]{}));
    }
}
