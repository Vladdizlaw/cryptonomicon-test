import { shallowMount } from "@vue/test-utils";
import FilterSection from "@/components/FilterSection.vue";
describe("FilterSection", () => {
  const factory = (props, data = {}) => {
    return shallowMount(FilterSection, {
      data() {
        return { ...data };
      },
      props: {
        ...props,
      },
    });
  };
  describe("should render if tickersLength not equal 0", () => {
    it("render if not 0", () => {
      const tickersLength = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      // console.log(tickersLength);
      const wrapper = factory({ tickersLength: tickersLength, filterpage: 1 });
      expect(wrapper.find("[data-test-filter=test-filter]").text()).toBe(
        "Filter:"
      );
    });
  });
  describe("should not render if tickersLength equal 0", () => {
    it("not render if 0", () => {
      const wrapper = factory({ tickersLength: 0, filterpage: 1 });
      expect(wrapper.find("[data-test-filter=test-filter]").exists()).toBe(
        false
      );
    });
  });
  describe("should emit eventn when click to butoon filterpage-decrease with filter from input", () => {
    it("decrease filterpage and emit event when filterpage more than 1", async () => {
      const tickersLength = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      const filter_page = Math.floor(Math.random() * (10 - 1 + 1) + 1) + 1;

      const wrapper = factory({
        tickersLength: tickersLength,
        filterpage: filter_page,
      });
      const filter = "hallo";
      wrapper.find("[data-test-filter=test-input]").setValue(filter);
      wrapper.find("[data-test-filter=filterpage-decrease]").trigger("click");
      // console.log(wrapper.emitted())
      expect(wrapper.emitted().filterpage[0][0]).toEqual({
        filterpage: filter_page - 1,
        filter: filter,
      });
    });
  });
  describe("should not emit event when click to butoon filterpage-decrease with filter from input", () => {
    it("decrease filterpage and emit event when filterpage equal 1", () => {
      const filter_page = 1;
      const wrapper = factory({ tickersLength: 1, filterpage: filter_page });
      const filter = "hallo";
      wrapper.find("[data-test-filter=test-input]").setValue(filter);
      wrapper.find("[data-test-filter=filterpage-decrease]").trigger("click");
    
      expect(wrapper.emitted()).not.toHaveProperty("filterpage");
    });
  });
});
