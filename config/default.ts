export default {
  port: 3000,
  dbUri: "mongodb://localhost:27017/restApi",
  saltRounds: 10,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCqrutuXgXTGB5yM+phYNm/eIPIX2c772sDo+7kSL77Eott7T5U
QP5flYhyZ6Qap1KojV8gF0Vwp2wkDzqDTWefTaHmeROFzFMAaKLiKqzfL5MfdRnS
xLCf6rV3bj4WGP54LTWJL0DJUbwjNzqBygtpRZRIcKmEGHUzef63Edgy1wIDAQAB
AoGBAImRjqRYF+26ZN+7RE/UVezjX6QicPx3zhMTEDri/zsyCTtCmpgiAmRcC6va
KQRqlE7SEze0Sf2wk5LEy26E9ty24/EawFcnX3XBrxJIIAziTIpDurmCnPI7PiL2
1RTJWaBz3qQSDCSSUbkT5nuP1gOjAyKfxO2lsk9TvGMcO0qBAkEA4//iQTuJC4eN
LwVJSxetKo4IILzXL5a0KdhvNLmd/HaF4OVaaujgIMEj8b4PahM5f7ts+IAu+nqn
3ZeXsCQpoQJBAL+lD2GLnf8UGlNdn71nZq3666biUAzCHkWiqQkP8U9M9M0i/B45
lCcrdvikh5dWagW6vj2lvAEpbNNzSvVEOXcCQDF2sBVK3z57F+wdj3sVFeJnkefY
UC7o2QlDBU1A/79nzz+tQmJzRzyT6kJl41418YF+nfODi62Xspdmbegu0EECQDq0
Kfj8VoJrOwEsXaEcCmTixsqQ6mpuD+3OvK6s9oMPFLG9tLLhelNhSgkyBOLDsqhc
oqepm+RTNyWyXFSy+FMCQEWmtvJuIjagOFNP5JUJBXjowwIYSL9qJ+QEayphxQ5h
L15ILNVMALcXy8n9pOOJ5mEBI/BGRo/d63Zbw2nrm9A=
-----END RSA PRIVATE KEY-----`,
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqrutuXgXTGB5yM+phYNm/eIPI
X2c772sDo+7kSL77Eott7T5UQP5flYhyZ6Qap1KojV8gF0Vwp2wkDzqDTWefTaHm
eROFzFMAaKLiKqzfL5MfdRnSxLCf6rV3bj4WGP54LTWJL0DJUbwjNzqBygtpRZRI
cKmEGHUzef63Edgy1wIDAQAB
-----END PUBLIC KEY-----`,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
};
