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
  private _listeners: Array<() => void> = [];

  // tslint:disable-next-line: variable-name
  constructor(private _renderer: Renderer2, private _el: ElementRef) {
    this._outsideClickHandlerHandler = this._outsideClickHandlerHandler.bind(
      this
    );
  }

  ngOnInit() {
    if (!this._el.nativeElement.hasChildNodes()) {
      throw new Error('[ngx-page-click] is not wrapping any children element');
    }
    if (!this.disabled) {
      this._addListeners();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.disabled &&
      !changes.disabled.firstChange &&
      changes.disabled.previousValue !== changes.disabled.currentValue
    ) {
      changes.disabled.currentValue
        ? this._removeListeners()
        : this._addListeners();
    }
  }

  ngOnDestroy() {
    this._removeListeners();
  }

  private _addListeners() {
    this._listeners = this.listenTo.map(eventTrigger => {
      return this._renderer.listen(
        document,
        eventTrigger,
        this._outsideClickHandlerHandler
      );
    });
  }

  private _removeListeners() {
    this._listeners.forEach(remove => remove());
  }

  _outsideClickHandlerHandler(event: Event): void {
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
