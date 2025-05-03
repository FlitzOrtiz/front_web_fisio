import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  type TemplateRef,
  ViewContainerRef,
  NgZone,
  type OnInit,
  ElementRef,
  type AfterViewInit,
  type OnDestroy,
  ContentChild,
  HostListener,
} from "@angular/core"
import { FormControl } from "@angular/forms"
import { debounceTime, takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Importamos Popper.js (asegúrate de instalarlo con: npm install @popperjs/core)

@Component({
  selector: 'fdropdown',
  imports: [ScrollingModule, CommonModule, ReactiveFormsModule],
  templateUrl: './fdropdown.component.html',
  styleUrl: './fdropdown.component.scss',
})
export class FdropdownComponent {
  // Propiedades para las opciones
  @Input() options: any[] = []
  @Input() labelField = "label"
  @Input() valueField = "value"
  @Input() placeholder = "Selecciona una opción"

  // Propiedades de UI
  @Input() labelText = ""
  @Input() errorMessage = ""
  @Input() suggestionMessage = ""
  @Input() showError = false
  @Input() showSuggestion = false
  @Input() disabled = false
  @Input() required = false
  @Input() name = ""
  @Input() id = "dropdown-id"
  @Input() errorIcon = "⚠️"
  @Input() suggestionIcon = "💡"

  // Clases CSS personalizables
  @Input() containerClass = ""
  @Input() labelClass = ""
  @Input() selectClass = "w-full p-2 border rounded"
  @Input() errorClass = ""
  @Input() suggestionClass = ""

  // Template personalizado para opciones
  @ContentChild("optionTemplate") optionTpl!: TemplateRef<any>

  // Eventos
  @Output() selectChange = new EventEmitter<any>()
  @Output() blur = new EventEmitter<void>()
  @Output() focus = new EventEmitter<void>()
  @Output() closed = new EventEmitter<void>()

  // Referencias
  @ViewChild("origin", { static: false }) origin!: ElementRef
  @ViewChild("dropdownMenu", { static: false }) dropdownMenu!: ElementRef

  // Control para búsqueda
  searchControl = new FormControl()

  // Estado interno
  isOpen = false
  originalOptions: any[] = []
  filteredOptions: any[] = []
  visibleOptions = 4

  // Control de valor
  private _model: any = null

  @Input()
  get model(): any {
    return this._model
  }
  set model(val: any) {
    if (val !== undefined && this.options.length) {
      if (typeof val === "object") {
        this._model = val
      } else {
        this._model = this.options.find((option) => option[this.valueField] === val)
      }
      this.selectChange.emit(this._model ? this._model[this.valueField] : null)
    } else {
      this._model = val
    }
  }

  // Para destruir observables
  private destroy$ = new Subject<void>()

  constructor(private el: ElementRef) { }

  @HostListener("document:click", ["$event"])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen && !this.el.nativeElement.contains(event.target)) {
      this.close()
    }
  }

  ngOnInit() {
    this.originalOptions = [...this.options]
    this.filteredOptions = [...this.options]

    if (this.model !== undefined && this.options.length) {
      if (typeof this.model !== "object") {
        this.model = this.options.find((option) => option[this.valueField] === this.model)
      }
    }

    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((term) => this.search(term))
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  toggle() {
    if (this.disabled) return

    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.isOpen = true
    this.focus.emit()

    // Enfoca el input de búsqueda si existe
    setTimeout(() => {
      const searchInput = this.el.nativeElement.querySelector(".search-input")
      if (searchInput) {
        searchInput.focus()
      }
    }, 0)
  }

  close() {
    this.isOpen = false
    this.closed.emit()
    this.searchControl.patchValue("")
    this.filteredOptions = [...this.originalOptions]
    this.blur.emit()
  }

  isActive(option: any) {
    if (!this.model) {
      return false
    }

    return option[this.valueField] === this.model[this.valueField]
  }

  select(option: any) {
    this.model = option
    this.selectChange.emit(option[this.valueField])
    this.close()
  }

  search(value: string) {
    if (!value) {
      this.filteredOptions = [...this.originalOptions]
    } else {
      this.filteredOptions = this.originalOptions.filter((option) =>
        option[this.labelField].toLowerCase().includes(value.toLowerCase()),
      )
    }

    this.visibleOptions = this.filteredOptions.length || 1
  }

  get displayLabel() {
    return this.model ? this.model[this.labelField] : this.placeholder
  }

  onBlur() {
    // Solo emitimos blur si no estamos en el dropdown
    if (!this.isOpen) {
      this.blur.emit()
    }
  }

  onFocus() {
    this.focus.emit()
  }

  trackByFn(index: number, item: any) {
    return item[this.valueField] || index
  }
}

