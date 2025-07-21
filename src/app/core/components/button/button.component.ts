import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
 @Input() type: 'button' | 'submit' = 'button';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() showBackArrow: boolean = false;
  @Input() responsive: boolean = true;
  @Input() hasBackButton: boolean = false;
  @Input() fullWidth: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    const base = 'flex items-center justify-center h-12 text-sm font-medium transition';

    const variantClasses = {
     primary: `bg-[#009169] text-white rounded-lg hover:opacity-90 disabled:opacity-50`,
    secondary: 'bg-white text-[#009169] border border-[#009169] rounded hover:bg-[#f0fdfa] border-solid border' // Updated here
  };

    // Size handling
    let sizeClasses = '';
    if (this.fullWidth) {
      sizeClasses = 'w-full';
    } else {
      if (this.variant === 'primary') {
        sizeClasses = this.hasBackButton
          ? 'w-full sm:w-auto px-6 md:min-w-[680px]'
          : 'w-full sm:w-auto px-6 md:min-w-[510px]';
      } else {
        sizeClasses = 'w-full sm:w-auto px-6';
      }
    }

    return `${base} ${variantClasses[this.variant]} ${sizeClasses}`;
  }
}
