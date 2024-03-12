/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "standalone",
	async redirects() {
		return [
			{
				source: "/dashboard/v6/prior-auth/upload/:path*",
				destination: "/dashboard/interqual-prior-auth/:path*",
				permanent: false,
			},
		]
	}
}

module.exports = nextConfig
