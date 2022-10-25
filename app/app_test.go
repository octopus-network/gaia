package gaia_test

type EmptyAppOptions struct{}

//
//func (ao EmptyAppOptions) Get(o string) interface{} {
//	return nil
//}
//
//func TestGaiaApp_BlockedModuleAccountAddrs(t *testing.T) {
//	app := gaia.NewGaiaApp(
//		log.NewNopLogger(),
//		db.NewMemDB(),
//		nil,
//		true,
//		map[int64]bool{},
//		gaia.DefaultNodeHome,
//		0,
//		gaia.MakeTestEncodingConfig(),
//		EmptyAppOptions{},
//	)
//	blockedAddrs := app.BlockedModuleAccountAddrs()
//
//	// TODO: Blocked on updating to v0.46.x
//	// require.NotContains(t, blockedAddrs, authtypes.NewModuleAddress(grouptypes.ModuleName).String())
//	require.NotContains(t, blockedAddrs, authtypes.NewModuleAddress(govtypes.ModuleName).String())
//}
