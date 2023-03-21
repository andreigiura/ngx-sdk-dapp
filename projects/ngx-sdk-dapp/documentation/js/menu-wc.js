'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ngx-sdk-dapp documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/NgxSdkDappModule.html" data-type="entity-link" >NgxSdkDappModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-NgxSdkDappModule-2b392faa75146d7b074be4b7763beb87b6d6c6a042af6302c3ac6bdacac8187ce0b3e63cb6b17ae7e1f691547d337cf05e4fbbb010c09ac7f28edcc5d47ed2e9"' : 'data-target="#xs-pipes-links-module-NgxSdkDappModule-2b392faa75146d7b074be4b7763beb87b6d6c6a042af6302c3ac6bdacac8187ce0b3e63cb6b17ae7e1f691547d337cf05e4fbbb010c09ac7f28edcc5d47ed2e9"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-NgxSdkDappModule-2b392faa75146d7b074be4b7763beb87b6d6c6a042af6302c3ac6bdacac8187ce0b3e63cb6b17ae7e1f691547d337cf05e4fbbb010c09ac7f28edcc5d47ed2e9"' :
                                            'id="xs-pipes-links-module-NgxSdkDappModule-2b392faa75146d7b074be4b7763beb87b6d6c6a042af6302c3ac6bdacac8187ce0b3e63cb6b17ae7e1f691547d337cf05e4fbbb010c09ac7f28edcc5d47ed2e9"' }>
                                            <li class="link">
                                                <a href="pipes/FormatAmountPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormatAmountPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ParseAmountPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParseAmountPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/LoginAccount.html" data-type="entity-link" >LoginAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyStorageEngine.html" data-type="entity-link" >MyStorageEngine</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchAccount.html" data-type="entity-link" >PatchAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefetchAccountData.html" data-type="entity-link" >RefetchAccountData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetAccount.html" data-type="entity-link" >ResetAccount</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountApiService.html" data-type="entity-link" >AccountApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link" >AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountState.html" data-type="entity-link" >AccountState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExtensionProviderService.html" data-type="entity-link" >ExtensionProviderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsProviderService.html" data-type="entity-link" >PermissionsProviderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/XPortalProviderService.html" data-type="entity-link" >XPortalProviderService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccountStateModel.html" data-type="entity-link" >AccountStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DecodedLoginTokenType.html" data-type="entity-link" >DecodedLoginTokenType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DecodedNativeAuthTokenType.html" data-type="entity-link" >DecodedNativeAuthTokenType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormatAmountType.html" data-type="entity-link" >FormatAmountType</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});