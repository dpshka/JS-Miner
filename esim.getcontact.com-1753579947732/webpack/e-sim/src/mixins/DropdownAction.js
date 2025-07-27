import { directive } from "click-outside-vue3"

export default {
  directives: {
    clickOutside: directive,
  },
  data() {
    return {
      showDropdown: false,
    }
  },
  methods: {
    toggleDropdownMenu() {
      if (this.showDropdown) {
        this.hideDropdownMenu()
      } else {
        this.showDropdownMenu()
      }
    },
    showDropdownMenu() {
      this.showDropdown = true
    },
    hideDropdownMenu() {
      // disable hideDropdownMenu() when input focused and mobile scrolling
      if (this.inputElement) {
        setTimeout(() => {
          this.showDropdown = document.querySelector(
            `${this.inputElement}:focus`
          )
        }, 50)

        return
      }

      this.showDropdown = false
    },
  },
}
