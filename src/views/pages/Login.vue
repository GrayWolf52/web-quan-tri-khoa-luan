<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Đăng nhập</h1>
                  <p class="text-muted">Đăng nhập vào tài khoản quản trị</p>
                  <CInput placeholder="Tài khoản" autocomplete="username email" v-model="username">
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput placeholder="Mật khẩu" type="password" autocomplete="curent-password" v-model="password">
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow style="margin: 10px 10px 10px 10px">
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" style="margin: 10px 10px 10px 10px" @click="LoginJWT()">Đăng
                        nhập</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Quên mật khẩu</CButton>
                      <!-- <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      > -->
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <CButton color="light" variant="outline" size="lg">
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard> -->
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      getData: "",
      username: "",
      password: ""
    };
  },
  methods: {
    LoginJWT() {
      // console.log("username: " + this.username);
      // console.log("password: " + this.password);
      axios
        .post(this.$store.state.MainLink + "User/Login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.$router.push({
            path: "/dashboard",
          });
          localStorage.username = response.data;
          axios
            .get(
              this.$store.state.MainLink + "User/GetById/" + response.data
            )
            .then((response) => {
              this.getData = response.data;
              this.$store.state.dataUser = response.data
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          alert("Tài khoản hoặc mật khẩu không chính xác, vui lòng kiểm tra lại!")
        });
    },

    getDataUser() { },
    direcToDash() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style scoped>
.form-group {
  margin: 10px;
}
</style>
