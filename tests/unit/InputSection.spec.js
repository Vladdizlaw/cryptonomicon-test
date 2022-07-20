import { shallowMount, mount } from "@vue/test-utils";
import InputSection from "@/components/InputSection.vue";

describe("InputSections", () => {
  const factory = (props, data) => {
    return mount(InputSection, {
      props: { ...props },
      data() {
        return { ...data };
      },
    });
  };
  describe("Input should not emit when press enter", () => {
    it("should not emit when input empty", () => {
      const wrapper = factory({ coinsList: { BTC: null }, tickersName: [] });
      wrapper.find("[data-test=input-test]").trigger("keydown.enter");
      expect(wrapper.emitted()).not.toHaveProperty("add-ticker");
    });
  });
  describe("Input should emit method when press enter", () => {
    it("should  emit when ticker in coinList", () => {
      const wrapper = factory({
        coinsList: {
          BTC: { fullName: "BTC" },
          BC: { fullName: "BC" },
          BT: { fullName: "BT" },
          B: { fullName: "B" },
        },
        tickersName: [],
      });
      wrapper.find("[data-test=input-test]").setValue("btc");
      wrapper.find("[data-test=input-test]").trigger("keydown.enter");

      // wrapper.find("[data-test=button-test]");
      // console.log(wrapper.emitted());
      expect(wrapper.emitted()).toHaveProperty("add-ticker");
    });
  });
  describe("Input should render warning when ticker in tickersname", () => {
    it("should not emit when ticker in tickersName and render warning", async () => {
      const wrapper = factory({
        coinsList: {
          BTC: { fullName: "BTC" },
          BC: { fullName: "BC" },
          BT: { fullName: "BT" },
          B: { fullName: "B" },
        },
        tickersName: ["BTC"],
      });
      await wrapper.find("[data-test=input-test]").setValue("btc");
      wrapper.find("[data-test=input-test]").trigger("keydown.enter");
      await expect(wrapper.find("[data-test=error-test]").text()).toBe(
        "This crypto is selected alredy"
      );
    });
  });
  describe("Input should render messages when ticker in coinsList", () => {
    it("should render messages when ticker in coinsList and not in coinsList", async () => {
      const wrapper = factory({
        coinsList: {
          BTC: { fullName: "BTC" },
          BCD: { fullName: "BCD" },
          BTX: { fullName: "BTX" },
          BX: { fullName: "BX" },
          B: { fullName: "B" },
          C: { fullName: "C" },
        },
        tickersName: [""],
      });
      await wrapper.find("[data-test=input-test]").setValue("b");
      // wrapper.find("[data-test=input-test]").trigger("keydown.enter");
    //  [... wrapper.findAll("[data-test=message-test]")].forEach((el)=>{console.log(el);});
      console.log(wrapper.findAll("[data-test=message-test]").length)
      await expect(wrapper.findAll("[data-test=message-test]").at(0).text()).toBe("B");
      await expect(wrapper.findAll("[data-test=message-test]").at(4).text()).toBe("BTX");
    });
  });
});
