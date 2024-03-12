import "@/styles/globals.css";

interface IRootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
	const { children } = props;
	
	return (
		<html lang="en">
			<head></head>
			<body>
				{children}
				<div id="modal" />
			</body>
		</html>
	)
}