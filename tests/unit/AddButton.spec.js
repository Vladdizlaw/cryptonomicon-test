import { mount } from "@vue/test-utils";
import AddButton from "@/components/AddButton.vue";
describe("AddButton", () => {
  it("should create a new Button", () => {
    const wrapper = mount(AddButton);

    expect(wrapper.text()).toMatch("Add");
  });
});
