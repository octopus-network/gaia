package gaia

import (
	"cosmossdk.io/depinject"
	"fmt"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/store/streaming"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"github.com/cosmos/cosmos-sdk/testutil/testdata_pulsar"
	"github.com/cosmos/cosmos-sdk/x/auth"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authsims "github.com/cosmos/cosmos-sdk/x/auth/simulation"
	"github.com/cosmos/cosmos-sdk/x/auth/vesting"
	vestingtypes "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	authzmodule "github.com/cosmos/cosmos-sdk/x/authz/module"
	"github.com/cosmos/cosmos-sdk/x/bank"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/capability"
	capabilitykeeper "github.com/cosmos/cosmos-sdk/x/capability/keeper"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"
	"github.com/cosmos/cosmos-sdk/x/consensus"
	consensuskeeper "github.com/cosmos/cosmos-sdk/x/consensus/keeper"
	consensustypes "github.com/cosmos/cosmos-sdk/x/consensus/types"
	crisiskeeper "github.com/cosmos/cosmos-sdk/x/crisis/keeper"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distr "github.com/cosmos/cosmos-sdk/x/distribution"
	distrkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/cosmos/cosmos-sdk/x/evidence"
	evidencekeeper "github.com/cosmos/cosmos-sdk/x/evidence/keeper"
	evidencetypes "github.com/cosmos/cosmos-sdk/x/evidence/types"
	"github.com/cosmos/cosmos-sdk/x/feegrant"
	feegrantkeeper "github.com/cosmos/cosmos-sdk/x/feegrant/keeper"
	feegrantmodule "github.com/cosmos/cosmos-sdk/x/feegrant/module"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	"github.com/cosmos/cosmos-sdk/x/gov"
	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
	govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
	"github.com/cosmos/cosmos-sdk/x/group"
	groupkeeper "github.com/cosmos/cosmos-sdk/x/group/keeper"
	groupmodule "github.com/cosmos/cosmos-sdk/x/group/module"
	"github.com/cosmos/cosmos-sdk/x/mint"
	mintkeeper "github.com/cosmos/cosmos-sdk/x/mint/keeper"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	"github.com/cosmos/cosmos-sdk/x/params"
	paramsclient "github.com/cosmos/cosmos-sdk/x/params/client"
	paramskeeper "github.com/cosmos/cosmos-sdk/x/params/keeper"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/cosmos/cosmos-sdk/x/slashing"
	slashingkeeper "github.com/cosmos/cosmos-sdk/x/slashing/keeper"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	"github.com/cosmos/cosmos-sdk/x/staking"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/cosmos/cosmos-sdk/x/upgrade"
	upgradeclient "github.com/cosmos/cosmos-sdk/x/upgrade/client"
	upgradekeeper "github.com/cosmos/cosmos-sdk/x/upgrade/keeper"

	"io"
	stdlog "log"
	"os"
	"path/filepath"

	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/runtime"
	"github.com/cosmos/cosmos-sdk/server/api"
	"github.com/cosmos/cosmos-sdk/server/config"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	_ "github.com/cosmos/cosmos-sdk/x/auth/tx/module"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	//ibcclienttypes "github.com/cosmos/ibc-go/v5/modules/core/02-client/types"
	//ibcchanneltypes "github.com/cosmos/ibc-go/v5/modules/core/04-channel/types"
	"github.com/spf13/cast"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/log"
	dbm "github.com/tendermint/tm-db"

	gaiaante "github.com/cosmos/gaia/v9/ante"
	gaiaappparams "github.com/cosmos/gaia/v9/app/params"
	// unnamed import of statik for swagger UI support
	_ "github.com/cosmos/cosmos-sdk/client/docs/statik"
)

var (
	// DefaultNodeHome default home directories for the application daemon
	DefaultNodeHome string

	//Upgrades = []upgrades.Upgrade{v7.Upgrade, v8.Upgrade}

	ModuleBasics = module.NewBasicManager(
		auth.AppModuleBasic{},
		genutil.NewAppModuleBasic(genutiltypes.DefaultMessageValidator),
		bank.AppModuleBasic{},
		capability.AppModuleBasic{},
		staking.AppModuleBasic{},
		mint.AppModuleBasic{},
		distr.AppModuleBasic{},
		gov.NewAppModuleBasic(
			[]govclient.ProposalHandler{
				paramsclient.ProposalHandler,
				upgradeclient.LegacyProposalHandler,
				upgradeclient.LegacyCancelProposalHandler,
			},
		),
		params.AppModuleBasic{},
		crisis.AppModuleBasic{},
		slashing.AppModuleBasic{},
		feegrantmodule.AppModuleBasic{},
		upgrade.AppModuleBasic{},
		evidence.AppModuleBasic{},
		authzmodule.AppModuleBasic{},
		groupmodule.AppModuleBasic{},
		//ibc.AppModuleBasic{},

		//transfer.AppModuleBasic{},
		vesting.AppModuleBasic{},
		//liquidity.AppModuleBasic{},
		//router.AppModuleBasic{},
		//ica.AppModuleBasic{},
		//icamauth.AppModuleBasic{},
		//globalfee.AppModule{},
		consensus.AppModuleBasic{},
	)
)

var (
	_ runtime.AppI            = (*GaiaApp)(nil)
	_ servertypes.Application = (*GaiaApp)(nil)
)

// GaiaApp extends an ABCI application, but with most of its parameters exported.
// They are exported for convenience in creating helper functions, as object
// capabilities aren't needed for testing.
type GaiaApp struct { //nolint: revive
	*runtime.App
	legacyAmino       *codec.LegacyAmino
	appCodec          codec.Codec
	txConfig          client.TxConfig
	interfaceRegistry codectypes.InterfaceRegistry

	// keys to access the substores
	keys map[string]*storetypes.KVStoreKey

	// keepers
	AccountKeeper    authkeeper.AccountKeeper
	BankKeeper       bankkeeper.Keeper
	CapabilityKeeper *capabilitykeeper.Keeper
	StakingKeeper    *stakingkeeper.Keeper
	SlashingKeeper   slashingkeeper.Keeper
	MintKeeper       mintkeeper.Keeper
	DistrKeeper      distrkeeper.Keeper
	GovKeeper        *govkeeper.Keeper
	CrisisKeeper     *crisiskeeper.Keeper
	UpgradeKeeper    upgradekeeper.Keeper
	ParamsKeeper     paramskeeper.Keeper
	AuthzKeeper      authzkeeper.Keeper
	// IBC Keeper must be a pointer in the app, so we can SetRouter on it correctly
	//IBCKeeper           *ibckeeper.Keeper
	//IBCFeeKeeper        ibcfeekeeper.Keeper
	//ICAControllerKeeper icacontrollerkeeper.Keeper
	//ICAHostKeeper       icahostkeeper.Keeper
	//ICAMauthKeeper      icamauthkeeper.Keeper
	EvidenceKeeper evidencekeeper.Keeper
	//TransferKeeper      ibctransferkeeper.Keeper
	FeeGrantKeeper        feegrantkeeper.Keeper
	GroupKeeper           groupkeeper.Keeper
	ConsensusParamsKeeper consensuskeeper.Keeper
	//LiquidityKeeper     liquiditykeeper.Keeper
	//RouterKeeper routerkeeper.Keeper

	// make scoped keepers public for test purposes
	//ScopedIBCKeeper           capabilitykeeper.ScopedKeeper
	//ScopedTransferKeeper      capabilitykeeper.ScopedKeeper
	//ScopedICAControllerKeeper capabilitykeeper.ScopedKeeper
	//ScopedICAHostKeeper       capabilitykeeper.ScopedKeeper
	//ScopedICAMauthKeeper      capabilitykeeper.ScopedKeeper

	// simulation manager
	sm *module.SimulationManager
}

func init() {
	userHomeDir, err := os.UserHomeDir()
	if err != nil {
		stdlog.Println("Failed to get home dir %2", err)
		panic(err)
	}

	DefaultNodeHome = filepath.Join(userHomeDir, ".gaia")
}

// NewGaiaApp returns a reference to an initialized Gaia.
func NewGaiaApp(
	logger log.Logger,
	db dbm.DB,
	traceStore io.Writer,
	loadLatest bool,
	appOpts servertypes.AppOptions,
	baseAppOptions ...func(*baseapp.BaseApp),
) *GaiaApp {
	var (
		app        = &GaiaApp{}
		appBuilder *runtime.AppBuilder

		appConfig = depinject.Configs(
			AppConfig,
			depinject.Supply(
				appOpts,
			),
		)
	)

	if err := depinject.Inject(appConfig,
		&appBuilder,
		&app.appCodec,
		&app.legacyAmino,
		&app.txConfig,
		&app.interfaceRegistry,
		&app.AccountKeeper,
		&app.BankKeeper,
		&app.CapabilityKeeper,
		&app.StakingKeeper,
		&app.SlashingKeeper,
		&app.MintKeeper,
		&app.DistrKeeper,
		&app.GovKeeper,
		&app.CrisisKeeper,
		&app.UpgradeKeeper,
		&app.ParamsKeeper,
		&app.AuthzKeeper,
		&app.EvidenceKeeper,
		&app.FeeGrantKeeper,
		&app.GroupKeeper,
		&app.ConsensusParamsKeeper,
	); err != nil {
		panic(err)
	}

	app.App = appBuilder.Build(logger, db, traceStore, baseAppOptions...)

	// configure state listening capabilities using AppOptions
	// we are doing nothing with the returned streamingServices and waitGroup in this case
	if _, _, err := streaming.LoadStreamingServices(app.App.BaseApp, appOpts, app.appCodec, app.keys); err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	/****  Module Options ****/

	// Sets the version setter for the upgrade module
	app.UpgradeKeeper.SetVersionSetter(app.BaseApp)

	// NOTE: The genutils module must occur after staking so that pools are
	// properly initialized with tokens from genesis accounts.
	// NOTE: The genutils module must also occur after auth so that it can access the params from auth.
	// NOTE: Capability module must occur first so that it can initialize any capabilities
	// so that other modules that want to create or claim capabilities afterwards in InitChain
	// can do so safely.
	genesisModuleOrder := []string{
		capabilitytypes.ModuleName,
		authtypes.ModuleName,
		banktypes.ModuleName,
		distrtypes.ModuleName,
		stakingtypes.ModuleName,
		slashingtypes.ModuleName,
		govtypes.ModuleName,
		minttypes.ModuleName,
		crisistypes.ModuleName,
		genutiltypes.ModuleName,
		evidencetypes.ModuleName,
		authz.ModuleName,
		feegrant.ModuleName,
		group.ModuleName,
		paramstypes.ModuleName,
		upgradetypes.ModuleName,
		vestingtypes.ModuleName,
		consensustypes.ModuleName,
	}
	app.ModuleManager.SetOrderInitGenesis(genesisModuleOrder...)
	app.ModuleManager.SetOrderExportGenesis(genesisModuleOrder...)

	// Uncomment if you want to set a custom migration order here.
	// app.ModuleManager.SetOrderMigrations(custom order)

	app.ModuleManager.RegisterInvariants(app.CrisisKeeper)

	// RegisterUpgradeHandlers is used for registering any on-chain upgrades.
	// Make sure it's called after `app.ModuleManager` and `app.configurator` are set.
	app.RegisterUpgradeHandlers()

	// add test gRPC service for testing gRPC queries in isolation
	testdata_pulsar.RegisterQueryServer(app.GRPCQueryRouter(), testdata_pulsar.QueryImpl{})
	// create the simulation manager and define the order of the modules for deterministic simulations
	//
	// NOTE: this is not required apps that don't use the simulator for fuzz testing
	// transactions
	overrideModules := map[string]module.AppModuleSimulation{
		authtypes.ModuleName: auth.NewAppModule(app.appCodec, app.AccountKeeper, authsims.RandomGenesisAccounts, app.GetSubspace(authtypes.ModuleName)),
	}
	app.sm = module.NewSimulationManagerFromAppModules(app.ModuleManager.Modules, overrideModules)

	app.sm.RegisterStoreDecoders()

	// initialize stores
	app.MountKVStores(app.keys)

	bypassMinFeeMsgTypes := cast.ToStringSlice(appOpts.Get(gaiaappparams.BypassMinFeeMsgTypesKey))
	if bypassMinFeeMsgTypes == nil {
		bypassMinFeeMsgTypes = GetDefaultBypassFeeMessages()
	}

	// set antehandlers
	anteHandler, err := gaiaante.NewAnteHandler(
		gaiaante.HandlerOptions{
			HandlerOptions: ante.HandlerOptions{
				AccountKeeper:   app.AccountKeeper,
				BankKeeper:      app.BankKeeper,
				FeegrantKeeper:  app.FeeGrantKeeper,
				SignModeHandler: app.TxConfig().SignModeHandler(),
				SigGasConsumer:  ante.DefaultSigVerificationGasConsumer,
				// TxFeeChecker is not the default fee check, it will not check if the fee meets min_gas_price, this is checked in NewFeeWithBypassDecorator already.
				//TxFeeChecker: func(ctx sdk.Context, tx sdk.Tx) (sdk.Coins, int64, error) {
				//	feeTx, ok := tx.(sdk.FeeTx)
				//	if !ok {
				//		return nil, 0, sdkerrors.Wrap(sdkerrors.ErrTxDecode, "Tx must be a FeeTx")
				//	}
				//
				//	feeCoins := feeTx.GetFee()
				//	priority := gaiafeeante.GetTxPriority(feeCoins)
				//
				//	return feeCoins, priority, nil
				//},
			},
			//IBCkeeper:            app.IBCKeeper,
			//BypassMinFeeMsgTypes: bypassMinFeeMsgTypes,
			//GlobalFeeSubspace:    app.GetSubspace(globalfee.ModuleName),
		},
	)
	if err != nil {
		panic(fmt.Errorf("failed to create AnteHandler: %s", err))
	}

	app.SetAnteHandler(anteHandler)

	// initialize BaseApp
	app.SetInitChainer(app.InitChainer)

	if err := app.Load(loadLatest); err != nil {
		panic(err)
	}

	return app
}

func GetDefaultBypassFeeMessages() []string {
	return []string{
		//sdk.MsgTypeURL(&ibcchanneltypes.MsgRecvPacket{}),
		//sdk.MsgTypeURL(&ibcchanneltypes.MsgAcknowledgement{}),
		//sdk.MsgTypeURL(&ibcclienttypes.MsgUpdateClient{}),
	}
}

// Name returns the name of the App
func (app *GaiaApp) Name() string { return app.BaseApp.Name() }

// InitChainer application update at chain initialization
func (app *GaiaApp) InitChainer(ctx sdk.Context, req abci.RequestInitChain) abci.ResponseInitChain {
	app.UpgradeKeeper.SetModuleVersionMap(ctx, app.ModuleManager.GetVersionMap())
	return app.App.InitChainer(ctx, req)
}

// LoadHeight loads a particular height
func (app *GaiaApp) LoadHeight(height int64) error {
	return app.LoadVersion(height)
}

// LegacyAmino returns GaiaApp's amino codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *GaiaApp) LegacyAmino() *codec.LegacyAmino {
	return app.legacyAmino
}

// AppCodec returns GaiaApp's app codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *GaiaApp) AppCodec() codec.Codec {
	return app.appCodec
}

// InterfaceRegistry returns GaiaApp's InterfaceRegistry
func (app *GaiaApp) InterfaceRegistry() codectypes.InterfaceRegistry {
	return app.interfaceRegistry
}

// TxConfig returns SimApp's TxConfig
func (app *GaiaApp) TxConfig() client.TxConfig {
	return app.txConfig
}

// GetKey returns the KVStoreKey for the provided store key.
//
// NOTE: This is solely to be used for testing purposes.
func (app *GaiaApp) GetKey(storeKey string) *storetypes.KVStoreKey {
	kvsk := app.keys[storeKey]
	if kvsk != nil {
		return kvsk
	}

	sk := app.UnsafeFindStoreKey(storeKey)
	kvStoreKey, ok := sk.(*storetypes.KVStoreKey)
	if !ok {
		return nil
	}
	return kvStoreKey
}

// GetSubspace returns a param subspace for a given module name.
//
// NOTE: This is solely to be used for testing purposes.
func (app *GaiaApp) GetSubspace(moduleName string) paramstypes.Subspace {
	subspace, _ := app.ParamsKeeper.GetSubspace(moduleName)
	return subspace
}

// SimulationManager implements the SimulationApp interface
func (app *GaiaApp) SimulationManager() *module.SimulationManager {
	return app.sm
}

// RegisterAPIRoutes registers all application module routes with the provided
// API server.
func (app *GaiaApp) RegisterAPIRoutes(apiSvr *api.Server, apiConfig config.APIConfig) {
	app.App.RegisterAPIRoutes(apiSvr, apiConfig)
	// register swagger API from root so that other applications can override easily
	if err := server.RegisterSwaggerAPI(apiSvr.ClientCtx, apiSvr.Router, apiConfig.Swagger); err != nil {
		panic(err)
	}
}

// GetMaccPerms returns a copy of the module account permissions
//
// NOTE: This is solely to be used for testing purposes.
func GetMaccPerms() map[string][]string {
	dup := make(map[string][]string)
	for _, perms := range moduleAccPerms {
		dup[perms.Account] = perms.Permissions
	}

	return dup
}

// BlockedAddresses returns all the app's blocked account addresses.
func BlockedAddresses() map[string]bool {
	result := make(map[string]bool)

	if len(blockAccAddrs) > 0 {
		for _, addr := range blockAccAddrs {
			result[addr] = true
		}
	} else {
		for addr := range GetMaccPerms() {
			result[addr] = true
		}
	}

	return result
}
