import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ElementRef,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ngx-page-click',
  template: '<ng-content></ng-content>',
})
export class NgxPageClickComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  listenTo: string[] = ['mousedown', 'touchstart'];

  @Input()
  outsideClickHandler = Function.prototype;

  @Input()
  disabled: boolean;

  // tslint:disable-next-line: variable-name
  private listeners: Array<() => void> = [];

  // tslint:disable-next-line: variable-name
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.outsideClickHandlerHandler = this.outsideClickHandlerHandler.bind(
      this
    );
  }

  ngOnInit() {
    if (!this.elementRef.nativeElement.hasChildNodes()) {
      throw new Error('[ngx-page-click] is not wrapping any children element');
    }
    if (!this.disabled) {
      this.addListeners();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.disabled &&
      !changes.disabled.firstChange &&
      changes.disabled.previousValue !== changes.disabled.currentValue
    ) {
      changes.disabled.currentValue
        ? this.removeListeners()
        : this.addListeners();
    }
  }

  ngOnDestroy() {
    this.removeListeners();
  }

  private addListeners() {
    this.listeners = this.listenTo.map((eventTrigger) => {
      return this.renderer.listen(
        document,
        eventTrigger,
        this.outsideClickHandlerHandler
      );
    });
  }

  private removeListeners() {
    this.listeners.forEach((remove) => remove());
  }

  private outsideClickHandlerHandler(event: Event): void {
    event.stopPropagation();

    if (this.disabled) {
      return;
    }

    const elements = document.querySelectorAll('ngx-page-click');
    const elementsLength = elements.length;

    if (!elementsLength) {
      return;
    }

    let userClickedInsideTarget = false;

    for (let index = 0; index < elementsLength; index++) {
      userClickedInsideTarget = elements[index].contains(event.target as Node);

      if (userClickedInsideTarget) {
        break;
      }
    }

    if (!userClickedInsideTarget) {
      this.outsideClickHandler(event);
    }
  }
}
