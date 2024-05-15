const Faq = () => {
    return (
        <div>
           <section className="dark:bg-gray-100 dark:text-gray-800">
	<div className="container  flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
		<h2 className="text-2xl font-semibold sm:text-4xl">Volunteer Management FAQs</h2>
		<p className="mt-4 mb-8 dark:text-gray-600">Below are some common questions about volunteering with us. If you have any other questions, feel free to reach out to our volunteer management team.</p>
		<div className="space-y-4">
			<details className="w-full border rounded-lg" open="">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How do I sign up to volunteer?</summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">You can sign up to volunteer by visiting our website and filling out the volunteer application form. Once submitted, our volunteer management team will reach out to you.</p>
			</details>
			<details className="w-full border rounded-lg" open="">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What are the requirements to volunteer?</summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">The requirements to volunteer vary depending on the role. Generally, we require volunteers to be at least 18 years old and pass a background check. Specific requirements may apply to certain positions.</p>
			</details>
			<details className="w-full border rounded-lg" open="">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">Can I volunteer remotely?</summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Yes, we offer remote volunteer opportunities for those who are unable to volunteer in person. Remote volunteers can contribute to various projects such as virtual event planning, social media management, and more.</p>
			</details>
		</div>
	</div>
</section> 
        </div>
    );
};

export default Faq;
