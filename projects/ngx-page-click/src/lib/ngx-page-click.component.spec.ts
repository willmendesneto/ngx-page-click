import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { NgxPageClickComponent } from './ngx-page-click.component';

@Component({
  selector: 'ngx-container',
  template: `
    <div>
      <div class="outside-content" (click)="outsideClick()"></div>
      <ngx-page-click
        class="first-section-wrapper"
        [disabled]="disabled"
        [outsideClickHandler]="outsideClickHandler"
        [listenTo]="on"
      >
        <p>First element content</p>
      </ngx-page-click>
      <ngx-page-click
        class="second-section-wrapper"
        [disabled]="disabled"
        [outsideClickHandler]="outsideClickHandler"
        [listenTo]="on"
      >
        <p>Second element content</p>
      </ngx-page-click>
    </div>
  `,
})
class ContainerComponent {
  disabled = false;
  on = ['click'];

  constructor() {
    this.outsideClickHandler = this.outsideClickHandler.bind(this);
  }

  outsideClick() {}

  outsideClickHandler() {}
}

describe('NgxPageClickComponent', () => {
  let fixture: any;
  let ngModule: any;
  let fixtureInstance: any;

  beforeEach(async(() => {
    ngModule = TestBed.configureTestingModule({
      declarations: [ContainerComponent, NgxPageClickComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = ngModule.createComponent(ContainerComponent);
    fixtureInstance = fixture.componentInstance;
    spyOn(document, 'addEventListener').and.callThrough();
    spyOn(document, 'removeEventListener').and.callThrough();
    spyOn(fixtureInstance, 'outsideClickHandler').and.callThrough();

    fixture.detectChanges();
  }));

  it('should toggle the event listeners based if `disabled` attribute value has been changed', () => {
    expect(document.addEventListener).toHaveBeenCalledTimes(2);
    expect(document.removeEventListener).not.toHaveBeenCalled();

    fixtureInstance.disabled = true;
    fixture.detectChanges();

    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(document.addEventListener).toHaveBeenCalledTimes(2);

    fixtureInstance.disabled = false;
    fixture.detectChanges();

    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(document.addEventListener).toHaveBeenCalledTimes(4);
  });

  it('should throw an error if component is not wrapping any children element', () => {
    expect(() =>
      ngModule.createComponent(NgxPageClickComponent).detectChanges()
    ).toThrowError('[ngx-page-click] is not wrapping any children element');
  });

  it('should be called if user clicks outside the wrapped content', () => {
    const outsideContent: HTMLElement = fixture.nativeElement.querySelector(
      '.outside-content'
    ) as HTMLElement;
    outsideContent.click();

    expect(fixtureInstance.outsideClickHandler).toHaveBeenCalled();
  });

  it('should NOT be called if user clicks inside the wrapped content', () => {
    const firstSection: HTMLElement = fixture.nativeElement.querySelector(
      '.first-section-wrapper p'
    ) as HTMLElement;
    firstSection.click();

    expect(fixtureInstance.outsideClickHandler).not.toHaveBeenCalled();
  });

  it('should NOT be called if user clicks outside the wrapped content AND the disabled attribute is `true`', () => {
    fixtureInstance.disabled = true;
    fixture.detectChanges();

    expect(document.removeEventListener).toHaveBeenCalled();

    const outsideContent: HTMLElement = fixture.nativeElement.querySelector(
      '.outside-content'
    ) as HTMLElement;
    outsideContent.click();
    expect(fixtureInstance.outsideClickHandler).not.toHaveBeenCalled();
  });
});
