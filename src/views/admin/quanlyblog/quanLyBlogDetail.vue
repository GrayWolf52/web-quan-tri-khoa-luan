<template>
    <div>
        <CRow>
            <CCol md="12" lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-justify-center" />
                        <strong> Thông tin sự kiện </strong>
                    </CCardHeader>
                    <CCardBody height="auto">
                        <CListGroup>
                            <CListGroupItem>
                                <span class="Title-font-size">Mã sự kiện : </span>
                                <span>{{ getData.id }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Tên sự kiên : </span>
                                <span>{{ getData.title }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Mô tả : </span>
                                <span>{{ getData.description }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Địa điểm : </span>
                                <span>{{ getData.place }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Danh sách người tham gia : </span>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên người dùng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in getData.participants" :key="index">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                {{ item.firstname }} {{ item.lastname }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Thời gian bắt đầu : </span>
                                <span>{{ getData.startTime }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Thời gian kết thúc : </span>
                                <span>{{ getData.endTime }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Trạng thái sự kiện : </span>
                                <span>{{ Status(getData.statusEvent) }}</span>
                            </CListGroupItem>
                        </CListGroup>
                    </CCardBody>
                </CCard>
            </CCol>
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
            group: "",
            formCollapsed: true,
        };
    },
    created() {
        this.getDetailProduct();
    },
    methods: {
        Status(val) {
            if (val == 0) return "Việc mới";
            else if (val == 1) return "Đang thực hiện";
            else if (val == 2) return "Hoàn thành";
        },
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
                .get(this.$store.state.MainLink + "Event/" + this.item)
                .then((response) => {
                    this.getData = response.data;
                    console.log(response.data);
                    axios
                        .get(
                            this.$store.state.MainLink + "Group/GetById/" + response.data.groupId
                        )
                        .then((response) => {
                            this.group = response.data;
                            console.log(response);
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
                .catch((e) => {

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
