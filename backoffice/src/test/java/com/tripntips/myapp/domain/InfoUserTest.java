package com.tripntips.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.tripntips.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InfoUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InfoUser.class);
        InfoUser infoUser1 = new InfoUser();
        infoUser1.setId(1L);
        InfoUser infoUser2 = new InfoUser();
        infoUser2.setId(infoUser1.getId());
        assertThat(infoUser1).isEqualTo(infoUser2);
        infoUser2.setId(2L);
        assertThat(infoUser1).isNotEqualTo(infoUser2);
        infoUser1.setId(null);
        assertThat(infoUser1).isNotEqualTo(infoUser2);
    }
}
