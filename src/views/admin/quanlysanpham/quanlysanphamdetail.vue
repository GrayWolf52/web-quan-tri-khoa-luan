<template>
  <div>
    <CRow>
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin của nhóm </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size">Mã nhóm : </span>
                <span>{{ getData.id }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Tên nhóm : </span>
                <span>{{ getData.groupName }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Mã người tạo : </span>
                <span>{{ getData.creatorId }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Người tạo : </span>
                <span>{{ getData.creator }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Ngày tạo : </span>
                <span>{{ getData.createdTime }}</span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- <CCol md="12">
        <table class="table" style="background: white">
          <tbody>
            <thead>
              <tr>
                <th scope="col">Thông tin cấu hình sản phẩm</th>
              </tr>
            </thead>
            <tr v-for="item in getData.productDetails" :key="item">
              <td>{{ item.propertyName }}</td>
              <td>{{ item.propertyValue }}</td>
            </tr>
          </tbody>
        </table>
      </CCol> -->
    </CRow>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamDetail",
  props: {
    item: Number
  },
  data() {
    return {
      getData: "",
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      selectedOption: "some value",

      formCollapsed: true,
    };
  },
  created() {
    this.getDetailProduct();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    CancelCreate() {
      this.$router.push("/quanlysanphamlist");
    },
    UpdateProduct() {
      this.$router.push("/quanlysanphamupdate");
    },
    getDetailProduct() {
      axios
        .get(this.$store.state.MainLink + "Group/GetById/" + this.item)
        .then((response) => {
          this.getData = response.data;
          console.log(this.getData);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.Title-font-size {
  font-weight: 600;
}
</style>
