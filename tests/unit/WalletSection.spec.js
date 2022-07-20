import WalletSection from "@/components/WalletSection.vue";
import { mount } from "@vue/test-utils";
describe("WalletSection", () => {
  const factory = (props, data) => {
    return mount(WalletSection, {
      props: { ...props },
      data() {
        return { ...data };
      },
    });
  };
  it("should add class active when it wallet was selected", async () => {
    const wrapper = factory({ filteredTickers: ["BTC", "BCD", "BX"] });
    await wrapper.find("[data-test=common-div]").trigger("click");
    await expect(wrapper.find("[data-test=wallet-div]").html()).toContain(
      "active"
    );
  });
  it("should emmit event when a delete button is clicked", async () => {
    const wrapper = factory({ filteredTickers: ["BTC", "BCD", "BX"] });
    await wrapper.find("[data-test=delete-btn]").trigger("click");
    // console.log(wrapper.emitted())
    await expect(wrapper.emitted()).toHaveProperty("btn-delete");
  });
});
