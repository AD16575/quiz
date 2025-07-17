# Global Components Guide

This guide shows how to use the new reusable components to maintain code quality and consistency across the MyQuizApp.

## 🎯 Benefits of Global Components

- **Consistency**: All UI elements follow the same design patterns
- **Maintainability**: Changes in one place affect all instances
- **Developer Experience**: Faster development with pre-built components
- **Code Quality**: Reduced duplication and cleaner code
- **Scalability**: Easy to add new features with existing components

## 📦 Available Components

### 1. Card Component

A versatile card container with multiple variants.

```tsx
import { Card } from "../components/common";

// Basic card
<Card>
  <Text>Card content</Text>
</Card>

// Different variants
<Card variant="small">Small card</Card>
<Card variant="large">Large card</Card>
<Card variant="outline">Outline card</Card>
<Card variant="elevated">Elevated card</Card>
<Card variant="gradient" gradient="primary">Gradient card</Card>
```

**Props:**

- `variant`: "default" | "small" | "large" | "gradient" | "outline" | "elevated"
- `gradient`: "primary" | "secondary" | "accent" | "success" | "warning" | "error"
- `style`: Custom styling
- `contentStyle`: Style for content wrapper

### 2. Button Component

Comprehensive button component with multiple states and variants.

```tsx
import { Button } from "../components/common";

// Primary button
<Button
  title="Click Me"
  onPress={() => console.log("Pressed")}
/>

// Different variants
<Button title="Secondary" variant="secondary" onPress={handlePress} />
<Button title="Outline" variant="outline" onPress={handlePress} />
<Button title="Ghost" variant="ghost" onPress={handlePress} />

// With icons
<Button
  title="Play Now"
  icon="play"
  variant="primary"
  onPress={handlePress}
/>

// Icon only button
<Button
  variant="icon"
  icon="close"
  onPress={handlePress}
/>

// Gradient button
<Button
  title="Get Started"
  variant="gradient"
  gradient="primary"
  onPress={handlePress}
/>

// Loading state
<Button
  title="Loading..."
  loading={true}
  onPress={handlePress}
/>
```

**Props:**

- `title`: Button text
- `variant`: "primary" | "secondary" | "outline" | "ghost" | "icon" | "gradient"
- `size`: "small" | "medium" | "large"
- `gradient`: For gradient variant
- `icon`: Ionicons name
- `iconPosition`: "left" | "right"
- `loading`: Show loading spinner
- `disabled`: Disable button
- `fullWidth`: Make button full width

### 3. Header Component

Consistent header with back button and customization options.

```tsx
import { Header } from "../components/common";

// Basic header
<Header title="Screen Title" />

// Header with subtitle
<Header
  title="Quiz Categories"
  subtitle="Choose your favorite topic"
/>

// Header with custom right component
<Header
  title="Profile"
  rightComponent={
    <Button
      variant="icon"
      icon="settings"
      onPress={handleSettings}
    />
  }
/>

// Header without back button
<Header
  title="Home"
  showBackButton={false}
/>
```

**Props:**

- `title`: Header title
- `subtitle`: Optional subtitle
- `showBackButton`: Show/hide back button (default: true)
- `rightComponent`: Custom component on the right
- `onBackPress`: Custom back button handler
- `centerTitle`: Center the title text

### 4. Input Component

Form input with validation and multiple variants.

```tsx
import { Input } from "../components/common";

// Basic input
<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
/>

// Required input with validation
<Input
  label="Password"
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry={true}
  required={true}
  error={passwordError}
/>

// Input with icons
<Input
  label="Search"
  placeholder="Search quizzes..."
  value={search}
  onChangeText={setSearch}
  leftIcon="search"
  rightIcon="close"
  onRightIconPress={() => setSearch("")}
/>

// Different variants
<Input variant="outline" {...props} />
<Input variant="filled" {...props} />

// Multiline input
<Input
  label="Description"
  multiline={true}
  numberOfLines={4}
  value={description}
  onChangeText={setDescription}
/>
```

**Props:**

- `label`: Input label
- `placeholder`: Placeholder text
- `value`: Input value
- `onChangeText`: Value change handler
- `variant`: "default" | "outline" | "filled"
- `error`: Error message
- `helperText`: Helper text below input
- `required`: Show required indicator
- `leftIcon`/`rightIcon`: Ionicons for decoration
- `secureTextEntry`: Password input
- `multiline`: Textarea input

### 5. IconContainer Component

Consistent icon containers with different sizes and styles.

```tsx
import { IconContainer } from "../components/common";

// Basic icon container
<IconContainer icon="star" />

// Different sizes
<IconContainer icon="heart" size="small" />
<IconContainer icon="trophy" size="large" />
<IconContainer icon="gift" size="extra-large" />

// Different variants
<IconContainer icon="play" variant="filled" color="rgb(238, 58, 124)" />
<IconContainer icon="pause" variant="outline" color="rgb(24, 154, 144)" />
<IconContainer icon="star" variant="gradient" gradient="primary" />

// Custom colors
<IconContainer
  icon="star"
  backgroundColor="rgba(255, 204, 0, 0.2)"
  iconColor="rgb(255, 204, 0)"
/>
```

**Props:**

- `icon`: Ionicons name
- `size`: "small" | "medium" | "large" | "extra-large"
- `variant`: "filled" | "outline" | "gradient"
- `color`: Icon/border color
- `backgroundColor`: Background color
- `gradient`: For gradient variant
- `iconColor`: Custom icon color

### 6. PointCard Component

Specialized card for displaying point statistics.

```tsx
import { PointCard } from "../components/common";

// Basic point card
<PointCard
  title="Total Points"
  value={1250}
  icon="star"
  variant="default"
/>

// Withdrawable points
<PointCard
  title="Withdraw"
  value={500}
  icon="wallet"
  variant="withdrawable"
  formatValue={(value) => `₹${value}`}
/>

// With subtitle
<PointCard
  title="Quizzes Played"
  value={45}
  icon="play-circle"
  variant="earned"
  subtitle="This month"
/>

// Dark theme variants
<PointCard
  title="Total Points"
  value={1250}
  icon="star"
  variant={themeState.isDark ? "defaultDark" : "default"}
/>
```

**Props:**

- `title`: Card title
- `value`: Numeric value to display
- `icon`: Ionicons name
- `variant`: Point card variant (matches theme)
- `subtitle`: Optional subtitle
- `formatValue`: Custom value formatting function

## 🎨 Global Styles

Use the `GlobalStyles` and `GradientColors` for consistent styling:

```tsx
import { GlobalStyles, GradientColors } from "../styles/globalStyles";

// Common layout styles
<View style={GlobalStyles.container}>
<View style={GlobalStyles.row}>
<View style={GlobalStyles.rowBetween}>
<Text style={GlobalStyles.titleText}>

// Common spacing
<View style={GlobalStyles.marginMD}>
<View style={GlobalStyles.paddingLG}>

// Gradient colors
<LinearGradient colors={GradientColors.primary}>
<LinearGradient colors={GradientColors.pointCards.default}>
```

## 🚀 Migration Example

**Before (duplicated code):**

```tsx
// Multiple screens with similar button styling
<TouchableOpacity
  style={{
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "rgb(238, 58, 124)",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  }}
  onPress={handlePress}
>
  <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
    Get Started
  </Text>
</TouchableOpacity>
```

**After (using global component):**

```tsx
<Button title="Get Started" variant="primary" onPress={handlePress} />
```

## 💡 Best Practices

1. **Use global components first** - Before creating custom styling, check if a global component exists
2. **Extend, don't override** - Use `style` prop to extend, not replace component styling
3. **Consistent variants** - Use the same variant names across similar components
4. **Theme awareness** - Components automatically adapt to light/dark themes
5. **Performance** - Global components are optimized for performance

## 🔧 Customization

All components accept a `style` prop for customization:

```tsx
<Button
  title="Custom Button"
  variant="primary"
  style={{ marginTop: 20, borderRadius: 20 }}
  textStyle={{ fontSize: 18 }}
/>

<Card
  variant="default"
  style={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }}
  contentStyle={{ padding: 30 }}
>
  <Text>Custom card</Text>
</Card>
```

## 📱 Import All Components

```tsx
// Import individual components
import { Card, Button, Header, Input } from "../components/common";

// Or import specific ones
import { PointCard } from "../components/common/PointCard";
```

This approach ensures consistent, maintainable, and scalable UI across the entire MyQuizApp!
