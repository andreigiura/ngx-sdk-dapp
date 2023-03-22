import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticationService, LedgerProviderService } from 'ngx-sdk-dapp';
import { MY_APP_CONFIG } from 'src/app/config';

@Component({
  selector: 'app-ledger-screen',
  templateUrl: './ledger-screen.component.html',
  styleUrls: ['./ledger-screen.component.sass'],
})
export class LedgerScreenComponent {
  config = MY_APP_CONFIG;
  currentPage = 0;
  addressesPerPage = 10;

  ledgerIsLoading = false;

  @Input() ledgerAccounts: string[] | undefined;

  @Output() resetLedgerLogin = new EventEmitter();

  constructor(
    public authService: AuthenticationService,
    private ledgerService: LedgerProviderService
  ) {}

  resetLedgerLoginHandler() {
    this.resetLedgerLogin.emit();
  }

  async nextPage() {
    this.currentPage++;
    this.ledgerIsLoading = true;
    this.ledgerAccounts = await this.ledgerService.loadAccounts(
      this.currentPage,
      this.addressesPerPage
    );
    this.ledgerIsLoading = false;
  }

  async authenticate(index: number) {
    this.ledgerIsLoading = true;
    await this.ledgerService.authenticateAccount(index);
    this.ledgerIsLoading = false;
  }

  async previousPage() {
    this.currentPage--;
    this.ledgerIsLoading = true;
    this.ledgerAccounts = await this.ledgerService.loadAccounts(
      this.currentPage,
      this.addressesPerPage
    );
    this.ledgerIsLoading = false;
  }
}
